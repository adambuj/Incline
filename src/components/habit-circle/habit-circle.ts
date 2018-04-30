import {
  Component,
  Input,
  Output,
  OnChanges,
  NgZone,
  EventEmitter,
  ViewChild,
  Renderer,
} from '@angular/core';
import {HabitCircleService} from './habit-circle.service';
import {HabitCircleConfig} from './habit-circle.config';
import {HabitCircleEase} from './habit-circle.ease';

/**
 * Generated class for the HabitCircleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'habit-circle',
  templateUrl: 'habit-circle.html'
})
export class HabitCircleComponent implements OnChanges{
  private _lastAnimationId: number = 0;

  constructor(
    private _service: HabitCircleService,
    private _easing: HabitCircleEase,
    private _defaults: HabitCircleConfig,
    private _ngZone: NgZone,
    private _renderer: Renderer
  ) {}

  /** Animates a change in the current value. */
  private _animateChange(from: number, to: number): void {
    if (typeof from !== 'number') {
      from = 0;
    }

    to = this._clamp(to);
    from = this._clamp(from);

    const self = this;
    const changeInValue = to - from;
    const duration = self.duration;

    // Avoid firing change detection for each of the animation frames.
    self._ngZone.runOutsideAngular(() => {
      let start = () => {
        const startTime = self._service.getTimestamp();
        const id = ++self._lastAnimationId;

        requestAnimationFrame(function animation(){
          let currentTime = Math.min(self._service.getTimestamp() - startTime, duration);
          let value = self._easing[self.animation](currentTime, from, changeInValue, duration);

          self._setPath(value);
          self.onRender.emit(value);

          if (id === self._lastAnimationId && currentTime < duration) {
            requestAnimationFrame(animation);
          }
        });
      };

      if (this.animationDelay > 0) {
        setTimeout(start, this.animationDelay);
      } else {
        start();
      }
    });
  }

  /** Sets the path dimensions. */
  private _setPath(value: number): void {
    if (this._path) {
      this._renderer.setElementAttribute(this._path.nativeElement, 'd', this._service.getArc(value,
          this.max, this.radius - this.stroke / 2, this.radius, this.semicircle));
    }
  }

  /** Clamps a value between the maximum and 0. */
  private _clamp(value: number): number {
    return Math.max(0, Math.min(value || 0, this.max));
  }

  /** Determines the SVG transforms for the <path> node. */
  getPathTransform(): string {
    let diameter = this._diameter;

    if (this.semicircle) {
      return this.clockwise ?
        `translate(0, ${diameter}) rotate(-90)` :
        `translate(${diameter + ',' + diameter}) rotate(90) scale(-1, 1)`;
    } else if (!this.clockwise) {
      return `scale(-1, 1) translate(-${diameter} 0)`;
    }
  }
  increment(){
    this.current++;
  }
  /** Resolves a color through the service. */
  resolveColor(color: string): string {
    return this._service.resolveColor(color);
  }

  /** Change detection callback. */
  ngOnChanges(changes): void {
    if (changes.current) {
      this._animateChange(changes.current.previousValue, changes.current.currentValue);
    } else {
      this._setPath(this.current);
    }
  }

  /** Diameter of the circle. */
  get _diameter(): number {
    return this.radius * 2;
  }

  /** The CSS height of the wrapper element. */
  get _elementHeight(): string {
    if (!this.responsive) {
      return (this.semicircle ? this.radius : this._diameter) + 'px';
    }
  }

  /** Viewbox for the SVG element. */
  get _viewBox(): string {
    let diameter = this._diameter;
    return `0 0 ${diameter} ${this.semicircle ? this.radius : diameter}`;
  }

  /** Bottom padding for the wrapper element. */
  get _paddingBottom(): string {
    if (this.responsive) {
      return this.semicircle ? '50%' : '100%';
    }
  }

  @ViewChild('path')         _path;
  @Input() current:          number;
  @Input() max:              number;
  @Input() radius:           number = this._defaults.get('radius');
  @Input() animation:        string = this._defaults.get('animation');
  @Input() animationDelay:   number = this._defaults.get('animationDelay');
  @Input() duration:         number = this._defaults.get('duration');
  @Input() stroke:           number = this._defaults.get('stroke');
  @Input() color:            string = this._defaults.get('color');
  @Input() background:       string = this._defaults.get('background');
  @Input() responsive:       boolean = this._defaults.get('responsive');
  @Input() clockwise:        boolean = this._defaults.get('clockwise');
  @Input() semicircle:       boolean = this._defaults.get('semicircle');
  @Input() rounded:          boolean = this._defaults.get('rounded');
  @Output() onRender:        EventEmitter<number> = new EventEmitter();
}


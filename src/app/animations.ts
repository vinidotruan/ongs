import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition(
    '* <=> *',
    [
      style({ position: 'relative' }),
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
          }),
        ],
        { optional: true }
      ),
      query(':enter', [style({ right: '-100%' })], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(
          ':leave',
          [animate('200ms ease-out', style({ right: '100%', opacity: 0 }))],
          { optional: true }
        ),
        query(':enter', [animate('300ms ease-out', style({ right: '0%' }))], {
          optional: true,
        }),
        query('@*', animateChild(), { optional: true }),
      ]),
    ],
    {}
  ),
]);

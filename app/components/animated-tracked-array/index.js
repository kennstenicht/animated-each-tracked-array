import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked, TrackedArray } from 'tracked-built-ins';
import move from 'ember-animated/motions/move';

export default class AnimatedTrackedArray extends Component {
  trackedArray = new TrackedArray([0]);
  emberArray = [0];

  @action
  addItem() {
    this.trackedArray.push(this.trackedArray.length);
    this.emberArray.pushObject(this.emberArray.length);
  }

  *transition(
    {
      removedSprites,
      insertedSprites,
    }
  ) {
    for (let sprite of removedSprites) {
      sprite.endAtPixel({ x: window.innerWidth + sprite.initialBounds.left });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite);
    }

    for (let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite);
    }
  }
}

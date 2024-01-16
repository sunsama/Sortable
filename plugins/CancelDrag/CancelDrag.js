export function CancelDragPlugin() {
  class CancelDrag {
		constructor() {
			this.defaults = {
				cancelDrag: true,
			};
		}
		drop({ cancel, dispatchSortableEvent, originalEvent, dragEl, cloneEl }) {
			// In case the 'ESC' key was hit, the originalEvent is of type 'dragEnd' (except for macOS chrome, where that will be sent if the element is dropped while pressing a key, like CMD, so we just disable this cancelling/reverting if swapping).
			if (originalEvent?.type === 'dragend' && !this.options.swap) {
				// Call revert on spill, to revert the drag using the existing algorithm.
				this.sortable.revertOnSpill?.onSpill(...arguments);

				// Undo changes on the drag element.
				if (dragEl) {
					dragEl.classList.remove(this.options.ghostClass);
					dragEl.classList.remove(this.options.chosenClass);
					dragEl.removeAttribute('draggable');
				}

				// In case of a copy, the cloneEl has to be removed again.
				if (cloneEl) {
					cloneEl.remove();
				}

				dispatchSortableEvent('end');

				cancel();
			}
		}
	}


  return Object.assign(CancelDrag, {
    pluginName: 'cancelDrag'
  });
};

export default CancelDragPlugin;

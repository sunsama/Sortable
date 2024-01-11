export function CancelDragPlugin() {
  class CancelDrag {
		constructor() {
			this.defaults = {
				cancelDrag: true,
			};
		}
		drop({ cancel, dispatchSortableEvent, originalEvent, dragEl, cloneEl }) {
			// In case the 'ESC' key was hit,
			// the origEvent is of type 'dragEnd'.
			if (originalEvent?.type === 'dragend') {

				// Call revert on spill, to revert the drag
				// using the existing algorithm.
				this.sortable.revertOnSpill?.onSpill(...arguments);

				// Undo changes on the drag element.
				if (dragEl) {
					// Remove ghost & chosen class.
					dragEl.classList.remove(this.options.ghostClass);
					dragEl.classList.remove(this.options.chosenClass);
					dragEl.removeAttribute('draggable');
				}

				// In case of a copy, the cloneEl
				// has to be removed again.
				if (cloneEl) {
					cloneEl.remove();
				}

				// Dispatch 'end' event.
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

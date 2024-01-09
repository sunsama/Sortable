import {
	toggleClass,
	index
} from '../../src/utils.js';

let swapValidEl;

function SwapPlugin() {
	class Swap {
		constructor() {
			this.defaults = {
				swapClass: 'sortable-swap-highlight'
			};
		}
		dragOver({ activeSortable, target, dragEl, onMove, completed, cancel }) {
			let el = this.sortable.el, options = this.options;

			// TODO: Remove this
			console.log('==== Swap.dragOver');
			console.log(JSON.stringify({ swapValidEl, target }, null, 2));

			if (!activeSortable.options.swap || !target || target === el || target.contains(dragEl) || onMove(target) === false) {
				swapValidEl && toggleClass(swapValidEl, options.swapClass, false);
				swapValidEl = null;

				// TODO: Remove this
				console.log('==== Swap.dragOver -- will cancel');

				completed(false);
				cancel();
			}
		}
		dragOverValid({ target, changed, completed, cancel }) {
			let options = this.options;

			// TODO: Remove this
			console.log('==== Swap.dragOverValid');
			console.log(JSON.stringify({ swapValidEl, target }, null, 2));

			if (swapValidEl && swapValidEl !== target) {
				toggleClass(swapValidEl, options.swapClass, false);
			}

			toggleClass(target, options.swapClass, true);
			swapValidEl = target;

			changed();

			completed(true);
			cancel();
		}
		drop({ activeSortable, putSortable, dragEl }) {
			// TODO: Remove this
			console.log('==== Swap.drop');
			console.log(JSON.stringify({ swapValidEl }, null, 2));

			if (!swapValidEl) {
				return;
			}

			let toSortable = putSortable || this.sortable, options = this.options;

			toggleClass(swapValidEl, options.swapClass, false);

			if (options.swap || putSortable && putSortable.options.swap) {
				// TODO: Remove this
				console.log('==== Swap.drop -- will swap');

				toSortable.captureAnimationState();
				if (toSortable !== activeSortable) {
					activeSortable.captureAnimationState();
				}

				swapNodes(dragEl, swapValidEl);

				toSortable.animateAll();
				if (toSortable !== activeSortable) {
					activeSortable.animateAll();
				}
			}
		}
		nulling() {
			// TODO: Remove this
			console.log('==== Swap.nulling');
			swapValidEl = null;
		}
	}


	return Object.assign(Swap, {
		pluginName: 'swap',
		eventProperties() {
			return {
				swapItem: swapValidEl
			};
		}
	});
}


function swapNodes(n1, n2) {
	let p1 = n1.parentNode,
		p2 = n2.parentNode,
		i1, i2;

	if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) {
		return;
	}

	i1 = index(n1);
	i2 = index(n2);

	if (p1.isEqualNode(p2) && i1 < i2) {
		i2++;
	}
	p1.insertBefore(n2, p1.children[i1]);
	p2.insertBefore(n1, p2.children[i2]);
}

export default SwapPlugin;

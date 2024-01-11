import Sortable from '../src/Sortable.js';
import AutoScroll from '../plugins/AutoScroll';
import { RemoveOnSpill, RevertOnSpill } from '../plugins/OnSpill';
// Extra
import Swap from '../plugins/Swap';
import MultiDrag from '../plugins/MultiDrag';
import CancelDrag from '../plugins/CancelDrag';

Sortable.mount(new AutoScroll());
Sortable.mount(RemoveOnSpill, RevertOnSpill);

export default Sortable;

export {
	Sortable,

	// Extra
	Swap,
	MultiDrag,
	CancelDrag
};

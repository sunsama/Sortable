import Sortable from './entry-defaults.js';
import Swap from '../plugins/Swap';
import MultiDrag from '../plugins/MultiDrag';
import CancelDrag from '../plugins/CancelDrag';

Sortable.mount(new Swap());
Sortable.mount(new MultiDrag());
Sortable.mount(new CancelDrag());

export default Sortable;

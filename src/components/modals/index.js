import AddChannel from './add-channel/add-channel.jsx';
import RenameModal from './rename-modal/rename-modal.jsx';
import RemoveModal from './remove-modal/remove-modal.jsx';
import { MODAL_NAMES } from './constants.js';

const modals = {
  [MODAL_NAMES.adding]: AddChannel,
  [MODAL_NAMES.renaming]: RenameModal,
  [MODAL_NAMES.removing]: RemoveModal,
};

export const getModal = (modalName) => modals[modalName];

export { MODAL_NAMES } from './constants.js';
export default {};

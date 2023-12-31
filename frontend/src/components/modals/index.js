import AddChannel from './add-channel/add-channel.jsx';
import RenameChannel from './rename-channel/rename-channel.jsx';
import RemoveChannel from './remove-channel/remove-channel.jsx';
import { MODAL_NAMES } from './constants.js';

const modals = {
  [MODAL_NAMES.adding]: AddChannel,
  [MODAL_NAMES.renaming]: RenameChannel,
  [MODAL_NAMES.removing]: RemoveChannel,
};

export const getModal = (modalName) => modals[modalName];

export { MODAL_NAMES } from './constants.js';
export default {};

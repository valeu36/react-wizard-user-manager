import PropTypes from 'prop-types';

import { ICONS } from '../../constants';

import { ReactComponent as EyeSolid } from '../../assets/icons/eye-solid.svg';
import { ReactComponent as EyeSlashSolid } from '../../assets/icons/eye-slash-solid.svg';
import { ReactComponent as UserSolid } from '../../assets/icons/user-solid.svg';
import { ReactComponent as AddSolid } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as UserFriendsSolid } from '../../assets/icons/user-friends-solid.svg';
import { ReactComponent as MinusSolid } from '../../assets/icons/minus-solid.svg';
import { ReactComponent as PenSolid } from '../../assets/icons/pen-solid.svg';
import { ReactComponent as TimesSolid } from '../../assets/icons/times-solid.svg';
import { ReactComponent as ChevronLeftSolid } from '../../assets/icons/chevron-left-solid.svg';

const NAME_TO_ICON = {
  [ICONS.eye]: EyeSolid,
  [ICONS.eyeSlash]: EyeSlashSolid,
  [ICONS.user]: UserSolid,
  [ICONS.add]: AddSolid,
  [ICONS.userFriends]: UserFriendsSolid,
  [ICONS.minus]: MinusSolid,
  [ICONS.pen]: PenSolid,
  [ICONS.times]: TimesSolid,
  [ICONS.chevronLeft]: ChevronLeftSolid,
};

const Icon = (props) => {
  const { width, height, icon, ...rest } = props;
  const Component = NAME_TO_ICON[icon];
  return <Component width={width} height={height} {...rest} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

Icon.defaultProps = {
  width: 16,
  height: 16,
};

export default Icon;

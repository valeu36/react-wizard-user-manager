import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../../../../constants';

import Avatar from '../../../../components/Avatar';
import CategoryBlock from '../CategoryBlock';
import CategoryItem from '../CategoryItem';

import styles from './styles.module.scss';

const UserProfile = ({ user }) => {
  const {
    id,
    avatar,
    userName,
    firstName,
    lastName,
    birthDate,
    email,
    address,
    company,
    fax,
    facebookLink,
    phoneNumbers,
    skills,
    myHobbies,
    githubLink,
    gender,
    mainLanguage,
  } = user;
  const history = useHistory();

  const onTitleClick = (slug) => () => history.push(`${ROUTES.editUser(id)}/${slug}`);

  return (
    <div className={styles.wrapper}>
      <div>
        <Avatar image={avatar} />
      </div>
      <div className={styles.inner}>
        <CategoryBlock title="Account" onTitleClick={onTitleClick('account')}>
          <CategoryItem title="User name" value={userName} />
          <CategoryItem title="Password" value="" />
        </CategoryBlock>

        <CategoryBlock title="Profile" onTitleClick={onTitleClick('profile')}>
          <CategoryItem title="First name" value={firstName} />
          <CategoryItem title="Last name" value={lastName} />
          <CategoryItem title="Birth date" value={format(Date.parse(birthDate), 'dd/MM/yyyy')} />
          <CategoryItem title="Email" value={email} />
          <CategoryItem title="Address" value={address} />
          <CategoryItem title="Gender" value={gender} />
        </CategoryBlock>

        <CategoryBlock title="Contacts" onTitleClick={onTitleClick('contacts')}>
          <CategoryItem title="Company" value={company} />
          <CategoryItem title="Github Link" value={githubLink} />
          <CategoryItem title="Facebook Link" value={facebookLink} />
          <CategoryItem title="Main Language" value={mainLanguage} />
          <CategoryItem title="Fax" value={fax} />
          {phoneNumbers.map((phone, index) => (
            <CategoryItem key={index.toString()} title={`Phone #${index + 1}`} value={phone} />
          ))}
        </CategoryBlock>

        <CategoryBlock title="Capabilities" onTitleClick={onTitleClick('capabilities')}>
          <CategoryItem title="Skills" value={skills.join(', ')} />
          <CategoryItem title="Hobbies" value={myHobbies.join(', ')} />
        </CategoryBlock>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    phoneNumbers: PropTypes.array,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    address: PropTypes.string.isRequired,
    fax: PropTypes.string.isRequired,
    facebookLink: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    myHobbies: PropTypes.array,
    skills: PropTypes.array.isRequired,
    mainLanguage: PropTypes.string.isRequired,
  }),
};

UserProfile.defaultProps = {
  user: {
    avatar: null,
    phoneNumbers: [],
    myHobbies: [],
  },
};

export default UserProfile;

import {UserInfo} from './UserInfo';
import { withUser } from './withUser';
import { UserInfoForm } from './UserInfoForm';

const UserInfoLoader = withUser(UserInfo, '345');

function App() {
	return (
		<UserInfoForm />
	);
}

export default App;

import {render, screen, cleanup} from '@testing-library/react-native';
import { Profile } from '../Profile';

afterEach(() => {
    cleanup();
});

test('Should render Profile component', () => {

    render(<Profile />);

    // make sure the outmost view renders
    expect(screen.getByTestId("profile-view")).toBeTruthy();
    // make sure the text for NetID is correct
    expect(screen.getByTestId("profile-netid").children[0]).toBe("NetID");
    
})
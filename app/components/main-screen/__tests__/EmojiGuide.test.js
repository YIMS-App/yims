import {render, screen, cleanup} from '@testing-library/react-native';
import EmojiGuide from '../EmojiGuide';

afterEach(() => {
    cleanup();
});

test('Should render EmojiGuide component', () => {
    render(<EmojiGuide />);
    // make sure the outmost view renders
    expect(screen.getByTestId("emoji-guide-view")).toBeTruthy();
    // make sure the text for "Fall" renders correctly
    expect(screen.getByTestId("emoji-guide-fall").children[0]).toBe("Fall");
})
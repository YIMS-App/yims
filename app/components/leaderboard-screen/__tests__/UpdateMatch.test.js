import {render, screen, cleanup} from '@testing-library/react-native';
import UpdateMatch from '../UpdateMatch'

afterEach(() => {
    cleanup();
});

test('Should render UpdateMatch component', () => {
    render(<UpdateMatch />);
    // make sure the outmost modal renders
    expect(screen.getByTestId("update-match-modal")).toBeTruthy();
    // make sure the text for "Score" renders correctly
    expect(screen.getByTestId("update-match-score-text").children[0]).toBe("Score");
})
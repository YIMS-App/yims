import {render, screen, cleanup} from '@testing-library/react-native';
import FirstPlaceStanding from '../FirstPlaceStanding'

afterEach(() => {
    cleanup();
});

test('Should render FirstPlaceStanding component', () => {
    // make dummy prop to render
     const dummyCollege = {
        "college": "Benjamin Franklin",
        "score": "42"
    }

    render(<FirstPlaceStanding firstPlace={dummyCollege}/>);

    // make sure the outmost view renders
    expect(screen.getByTestId("first-place-standing-view")).toBeTruthy();
    // make sure the text for the college is the same as the dummy prop we passed in
    expect(screen.getByTestId("first-place-standing-college").children[0]).toBe(dummyCollege.college);
    // make sure the text for the number of the points is the same as the dummy prop that we passed in
    expect(screen.getByTestId("first-place-standing-points").children[0]).toBe(dummyCollege.score);
    
})
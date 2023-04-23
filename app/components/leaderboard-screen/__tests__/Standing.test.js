import {render, screen, cleanup} from '@testing-library/react-native';
import Standing from '../Standing';

afterEach(() => {
    cleanup();
});

test('Should render Standing component', () => {
    // make dummy prop to render
     const dummyItem = {
        item: {
            "college": "Benjamin Franklin",
        }
    }

    render(<Standing collegeData={dummyItem}/>);

    // make sure the outmost view renders
    expect(screen.getByTestId("standing-view")).toBeTruthy();
    // make sure the text for the college is the same as the dummy prop we passed in
    expect(screen.getByTestId("standing-college-text").children[0]).toBe(dummyItem.item.college);
    // // make sure the text for the number of the points is the same as the dummy prop that we passed in
    expect(screen.getByTestId("standing-score-text").children[0]).toBe(" points");
    
})
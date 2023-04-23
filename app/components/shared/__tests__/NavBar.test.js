import {render, screen, cleanup} from '@testing-library/react-native';
import NavBar from '../NavBar';

afterEach(() => {
    cleanup();
});

test('Should render NavBar component', () => {
    // check the white NavBar component
    render(<NavBar color={"white"} title={"Test Title"}/>);
    // make sure the outmost view renders
    expect(screen.getByTestId("navbar-view-white")).toBeTruthy();
    // make sure the text for the title renders correctly
    expect(screen.getByTestId("navbar-title-white").children[0]).toBe("Test Title");

    // check the blue NavBar component
    render(<NavBar title={"Test Title"}/>);
    // make sure the outmost view renders
    expect(screen.getByTestId("navbar-view-blue")).toBeTruthy();
    // make sure the text for the title renders correctly
    expect(screen.getByTestId("navbar-title-blue").children[0]).toBe("Test Title");
})
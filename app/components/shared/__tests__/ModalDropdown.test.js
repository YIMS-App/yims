import {render, screen, cleanup} from '@testing-library/react-native';
import ModalDropdown from '../ModalDropdown';

afterEach(() => {
    cleanup();
});

test('Should render ModalDropdown component', () => {

    const colleges = [
        "Benjamin Franklin",
        "Berkeley",
        "Branford",
        "Davenport",
        "Ezra Stiles",
        "Grace Hopper",
        "Jonathan Edwards",
        "Morse",
        "Pauli Murray",
        "Pierson",
        "Silliman",
        "Saybrook",
        "Trumbull",
        "Timothy Dwight",
      ];

    render(<ModalDropdown options={colleges}/>);

    // make sure the outmost view renders
    expect(screen.getByTestId("modal-dropdown-view")).toBeTruthy();
    
})
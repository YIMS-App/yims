import {render, screen, cleanup} from '@testing-library/react-native';
import MatchDetails from '../MatchDetails';

afterEach(() => {
    cleanup();
});

test('Should render MatchDetails component', () => {

    const match = {
        college1: "Benjamin Franklin",
        college2: "Pauli Murray",
        sport: "Indoor Soccer",
        location: "Payne Whitney"
    }

    render(<MatchDetails match={match}/>);

    // make sure the outmost view renders
    expect(screen.getByTestId("match-details-modal")).toBeTruthy();
    // make sure the text for the college is the same as the dummy prop we passed in/
    expect(screen.getByTestId("match-standings-college1").children[0]).toBe(match.college1);
    expect(screen.getByTestId("match-standings-college2").children[0]).toBe(match.college2);
    // make sure the text for the sport is the same as the dummy prop that we passed in
    expect(screen.getByTestId("match-standings-sport").children[0]).toBe(match.sport);
      // make sure the text for the location is the same as the dummy prop that we passed in
      expect(screen.getByTestId("match-standings-location").children[0]).toBe(match.location);
    
})
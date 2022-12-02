import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> Rendering", function() {
    describe("initial board and win state", function() {
        it("Smoke test: renders without crashing", function() {
            render(<Board />);
        });
        
        it("Matches snapshot for full board", function() {
            const { asFragment } = render(<Board chanceLightStartsOn={1} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it("Should win state when all lights are off", function() {
            const { getByText } = render(<Board chanceLightStartsOn={0} />);
            expect(getByText("YOU WIN!!!")).toBeInTheDocument();
        });
    });

    describe("Cell click", function() {
        it("toggles lights correctly", function() {
            const { getByText, getAllByRole } = render(<Board 
                nrows={3}
                ncols={3}
                chanceLightStartsOn={1} />
            );
            const cells = getAllByRole("cell");
    
            // all cells start out lit
            cells.forEach(cell => {
                expect(cell).toHaveClass("Cell-lit");
            });
    
            //click on the middle cell
            fireEvent.click(cells[4]);
    
            // only cells in the corners should be lit
            let litIndices = [0, 2, 6, 8];
            cells.forEach((cell, idx) => {
                if (litIndices.includes(idx)) {
                    expect(cell).toHaveClass("Cell-lit");
                } else {
                    expect(cell).not.toHaveClass("Cell-lit");
                }
            });
        });

        it("Says YOU WIN!!! when clicking and filling the board", function() {
            // Create a board that can be won with one click
            const { queryByText, getAllByRole } = render(<Board 
                nrows={1}
                ncols={3}
                chanceLightStartsOn={1} />
            );

            // In it's current state, check the game hasn't won yet.
            expect(queryByText("YOU WIN!!!")).not.toBeInTheDocument();

            // Clicking on the middle cell wins the game
            const cells = getAllByRole("cell");
            fireEvent.click(cells[1]);
            expect(queryByText("YOU WIN!!!")).toBeInTheDocument();
        });
    });
});


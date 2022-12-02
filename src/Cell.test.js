import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell /> Rendering", function() {
    let container;

    beforeEach(function() {
        // add a TR to the document created by the test
        // Avoid warnings in the test output about appending a TD to a div
        let tr = document.createElement("tr");
        container = document.body.appendChild(tr);
    });

    it("renders without crashing", function() {
        render(<Cell />, { container });
    });

    it("Matches snapshot when lit", function() {
        const { asFragment } = render(<Cell isLit />, { container });
        expect(asFragment()).toMatchSnapshot();
    });

    it("Matches snapshot when not lit", function() {
        const { asFragment } = render(<Cell />, { container });
        expect(asFragment()).toMatchSnapshot();
    });
}); 
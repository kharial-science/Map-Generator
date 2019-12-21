import React, { Component } from 'react'

class Explanation extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => entry.isIntersecting ? entry.target.classList.add('visible') : 0 )
        }, { rootMargin: "-300px" })

        observer.observe(document.querySelector("#explanation-container"))
    }

    render() {

        let sowingChunks = [
            "", "plains sowing", "", "", "",
            "", "", "", "", "",
            "ocean sowing", "", "", "", "",
            "", "", "", "", "",
            "", "", "plains sowing", "", ""
        ]
        .map(chunk => <div className={`chunk ${chunk}`}></div>)

        if (this.props.number === 0) {
            return (
                <div className="Explanation exp-one">
                    <h3 className="number">1.</h3>
                    <h3 className="title">Sow</h3>
                    <p>Pick random chunks on the white map to generate the biomes strains</p>
                    <div className="image sow">{sowingChunks}</div>
                </div>
            )
        }

        else if (this.props.number === 1) {

            let expandingChunks = [
                "plains expanding", "plains", "plains expanding", "", "",
                "ocean expanding", "plains expanding", "plains expanding", "", "",
                "ocean", "ocean expanding", "", "", "",
                "", "ocean expanding", "plains expanding", "", "",
                "", "plains expanding", "plains", "plains expanding", ""
            ]
            .map(chunk => <div className={`chunk ${chunk}`}></div>)

            return (
                <div className="Explanation exp-two">
                    <h3 className="number">2.</h3>
                    <h3 className="title">Expand</h3>
                    <p>Expand the strains to the nearest chunks using previously chosen probabilities</p>
                    <div className="image expand">{expandingChunks}</div>
                </div>
            )
        }

        else if (this.props.number === 2) {

            let fixingChunks = [
                "plains", "plains", "plains", "plains", "plains fixing",
                "ocean", "plains", "plains", "plains", "plains",
                "ocean", "ocean", "ocean", "plains", "plains",
                "ocean", "ocean", "plains", "plains", "plains fixing",
                "plains", "plains", "plains", "plains", "plains"
            ]
            .map(chunk => <div className={`chunk ${chunk}`}></div>)

            return (
                <div className="Explanation exp-three">
                    <h3 className="number">3.</h3>
                    <h3 className="title">Fix</h3>
                    <p>Because of probabilities some chunks will remain white. Force them to pick a color</p>
                    <div className="image fix">{fixingChunks}</div>
                </div>
            )
        }

    }
}

export default Explanation
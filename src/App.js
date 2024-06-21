import logo from './logo.svg';
import React from 'react';
import './App.css';
import { quoteArr } from './Quotes.js';
import { colourArr } from './Colours.js';

const defaultColourIndex = Math.floor(Math.random() * colourArr.length);
const defaultQuoteIndex = Math.floor(Math.random() * quoteArr.length);

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <figure>
        <blockquote className="blockquote text-center">
          <p
            id="text"
            className=""
            style={{ color: this.props.colour.bgColour }}
          >
            <i class="fa-solid fa-quote-left"></i>&nbsp;{this.props.quote}{" "}
            &nbsp;<i class="fa-solid fa-quote-right"></i>
          </p>
        </blockquote>
        <figcaption
          id="author"
          className="blockquote-footer text-end"
          style={{ color: this.props.colour.bgColour }}
        >
          {this.props.author}
        </figcaption>
      </figure>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.newQuoteButton = this.newQuoteButton.bind(this);
  }

  newQuoteButton() {
    this.props.updateQuote();
  }

  createTwitterURL() {
    return (
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(
        '"' +
          quoteArr[this.props.quoteIndex].quote +
          '"\n— ' +
          quoteArr[this.props.quoteIndex].author +
          "\n"
      ) +
      "&hashtags=lyrics,quotes," +
      encodeURIComponent(
        quoteArr[this.props.quoteIndex].author.replace(/\s+/g, "")
      )
    );
  }

  render() {
    return (
      <div className="d-flex flex-column-reverse flex-sm-row justify-content-between">
        <a
          id="tweet-quote"
          href={this.createTwitterURL()}
          target="_blank"
          className={"btn m-1 text-" + this.props.colour.fgColour}
          style={{
            backgroundColor: this.props.colour.bgColour
          }}
        >
          <i class="fa-brands fa-x-twitter"></i> Post to Twitter
        </a>
        <button
          id="new-quote"
          onClick={this.newQuoteButton}
          className={"btn m-1 text-" + this.props.colour.fgColour}
          style={{
            backgroundColor: this.props.colour.bgColour
          }}
        >
          <small>
            <sup>
              <i class="fa-solid fa-quote-left"></i>
            </sup>
            <sub>
              <i class="fa-solid fa-quote-right"></i>
            </sub>
          </small>{" "}
          New&nbsp;Quote
        </button>
      </div>
    );
  }
}

class QuoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colourIndex: defaultColourIndex,
      quoteIndex: defaultQuoteIndex
    };
    this.updateQuote = this.updateQuote.bind(this);
  }

  updateQuote() {
    this.setState({
      colourIndex: this.randomIndex(colourArr, this.state.colourIndex),
      quoteIndex: this.randomIndex(quoteArr, this.state.quoteIndex)
    });
  }

  randomIndex(arr, prevIndex) {
    let newIndex = Math.floor(Math.random() * arr.length);
    while (prevIndex == newIndex) {
      newIndex = Math.floor(Math.random() * arr.length);
    }
    return newIndex;
  }

  render() {
    return (
        <div
          id="wrapper"
          className={
            "container-fluid d-flex flex-column justify-content-between align-items-center"
          }
          style={{
            backgroundColor: colourArr[this.state.colourIndex].bgColour
          }}
        >
          <div></div>
          <div
            id="quote-box"
            className={
              "container rounded-3 col-10 col-md-8 col-lg-6 col-xl-4 p-3 bg-" +
              colourArr[this.state.colourIndex].fgColour
            }
          >
            <Quote
              quote={quoteArr[this.state.quoteIndex].quote}
              author={quoteArr[this.state.quoteIndex].author}
              colour={colourArr[this.state.colourIndex]}
            />
            <Buttons
              updateQuote={this.updateQuote}
              quoteIndex={this.state.quoteIndex}
              colour={colourArr[this.state.colourIndex]}
            />
          </div>
          <div
            className={
              "fw-light text-" + colourArr[this.state.colourIndex].fgColour
            }
          >
            Created by Kevin Levy
          </div>
        </div>
    );
  }
}

function App() {
  return (
      <QuoteApp />
  );
}

export default App;

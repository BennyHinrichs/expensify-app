import React from 'react';

const regex = '/^((\d{1,}(\.\d{0,2})?)|(\.\d{1,2})?|(\.)?)$/';

class AdditionsPage extends React.Component {
    render() {
        document.documentElement.scroll(0, 0);
        return (
            <div>
                <div className="page-header">
                    <h1 className="content-container page-header__title">Additions</h1>
                </div>
                <div className="content-container">
                    <p>See the source code: <a href="https://github.com/BennyHinrichs/expensify-app">GitHub repo</a></p>
                    <span>
                        I learned a massive amount from this course, and I couldn't stop myself from continuing on. Here's a (hopefully comprehensive) list of the changes I've made to the project.
                        You can see the original app from Andrew Meade and his insanely good React course <a href="http://expensify.mead.io/">here</a>.
                        If you haven't already, try adding some data points and checking out the features (graphing, editing, filtering).
                    </span>
                    <ul className="additions-list">
                        <li className="additions-list-section">Login Page</li>
                            <ul className="additions-list__sub">
                                <li>Background</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">Got a different image (I know, be impressed).</li>
                                        <li className="additions-list-item">Added a vignette via box-shadow.</li>
                                        <li className="additions-list-item">Changed the opacity, added a background color over it with the blend mode color dodge.</li>
                                    </ul>
                                <li>Logo</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">Made an actual logo with a fun little stylized S.</li>
                                        <li className="additions-list-item">There are two different logo images: one for desktop and one for mobile.  The desktop one has the subtitle built into the image. The mobile one renders text instead for the subtitle.</li>
                                        <li className="additions-list-item">This seems a good place to mention the favicon and loading animation. I used the $ from the logo to make my own icons.</li>
                                    </ul>
                                <li>Button</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">Updated color to match scheme.</li>
                                        <li className="additions-list-item">Added the Google icon.</li>
                                    </ul>          
                            </ul>
                        <li className="additions-list-section">Dashboard</li>
                            <ul className="additions-list__sub">
                                <li>Header</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">And there it is again, the logo. This time I used CSS to recolor it. I also made it the background image of a div. Had to use a trick where you set the height to 0 and padding to 10-15% to make it work.</li>
                                        <li className="additions-list-item">The logout text now has a hover animation. I breifly flirted with making all buttons turn yellow on hover, but I decided it looked tacky.</li>
                                        <li className="additions-list-item">The summary is now centered. Some margin adjustment.</li>
                                    </ul>
                                <li>Expense List</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">Note is now visible on hover; right aligned for mobile.</li>
                                        <li className="additions-list-item">The style truncates both the description and note with ellipses.</li>
                                    </ul>
                            </ul>
                        <li className="additions-list-section">Graph</li>
                            <ul className="additions-list__sub">
                                <li>Overview</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">So this is the brand new component that I did completely solo! I knew going into it that it would be difficult, but it was a good challenge.</li>
                                        <li className="additions-list-item">Some things (like handling fringe cases) took way longer than I anticipated. Others (hooking the graph up to render on filter change) took much shorter than I would have guessed. That's programming though, I suppose.</li>
                                        <li className="additions-list-item">The first thing you'll probably notice is the new "Show Graph" button right-aligned. Try clicking it when you have no data and when you have several data points.</li>
                                    </ul>
                                <li>Sort By</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">It quickly became apparent I needed two different types of graphs for the two different sort methods. That meant processing the data accordingly. Can't tell you how long it took to figure out the proper datastructure to work with Chart.js haha.</li>
                                        <li className="additions-list-item">After much war, I got the tooltips working. Got everything working, really, for the scatter. Then when I tried to implement the line graph for sortBy amount, war was waged once more.</li>
                                        <li className="additions-list-item">Nothing would get in the right order. First it was the labels, then the data, then the titles. It always seemed like just when I had it figured out with the data and labels, I'd look and realize yet another thing was wrong.</li>
                                    </ul>
                                <li>Labeling</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">To get my data into proper order and format, I had to use Chart.js's callback functions. What frazzled my mind was that I had a callback for the labels and one for the titles, both looking like <span className="additions-list-item--code">(tooltipItem, data) => {'{}'}</span>. To access tooltipItem in title, you had to put an index on it, but not so in label! Who even comes up with this stuff?</li>
                                        <li className="additions-list-item">An annoying aspect of the callbacks is that I needed them, in addition to other parts of my code, to run certain ways based off a conditon. I wanted to do all the conditional stuff in one place, but couldn't figure out a way and still get my data where it needed to be, so I had to duplicate that conditional code.</li>
                                        <li className="additions-list-item">The spread operator saved my life at least five different times in this component alone.</li>
                                        <li className="additions-list-item">I tried the fringe case of really long descriptions and ended up making a truncator function that cuts off incoming strings and appends ellipses.</li>
                                        <li className="additions-list-item">And then the labels would all drop except the first and last if I had more than several points. I eventually found that deactivating <span className="additions-list-item--code">autoSkip</span> takes care of that!</li>
                                    </ul>
                                <li>Fringe Cases</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">First we have the case of no data. I decided to render no graph in this case and to just throw up a message instead.</li>
                                        <li className="additions-list-item">Next is the case with one point. This took an unngrokkable amount of time to wrangle down. The graph was only showing a very unattractive point on the y-axis. I needed it centered. What I had to do was add null points a day before and after the single point to make it look nice.</li>
                                        <li className="additions-list-item">But that's not the end. You see, there's also the case of multiple points that have the same values, thus apprearing to be a single point. Now we have to compare and see if the points are the same, then add time-spaced null values to the ends. I put a tolerance of 12 hours on it.</li>
                                        <li className="additions-list-item">Once I got all the padding worked out, of course the labels and tooltips were all out of wack, but only for specific cases. I went in and tracked down the issues with each case, so the graph should now handle any (not gigantic) set of data.</li>
                                    </ul>
                            </ul>
                        <li className="additions-list-section">Expense Form</li>
                            <ul className="additions-list__sub">
                                <li>Regular Expression</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">I added support for the amount regex to accept a period alone, because sometimes you want to type a value like .95. That's the third section of the regex. The second section accounts for inputs after you've typed the decimal and allows one to two digits. So you can enter things like .6 now.</li>
                                        <li className="additions-list-item--code additions-list-item">{regex}</li>
                                        <li className="additions-list-item">However, this now opens it up to the possibility of the user entering just a decimal point in the field. Never fear, the app won't allow it! We just pop up a cheeky message telling them to get their head in the game and we're golden.</li>
                                    </ul>
                                <li>Delete</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">There is now a confirmation message that pops up when you press delete.</li>
                                        <li className="additions-list-item">After three seconds, the message fades away and you have to press delete again (twice) to remove the expense. Want to prevent accidents!</li>
                                    </ul>
                            </ul>
                            <li className="additions-list-section">TODO</li>
                            <ul className="additions-list__sub">
                                <li>Graph Links</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">I might just say I'm done now and move onto another project, but one potential tweak that keeps calling my name is to add links to the graph points that take you to the edit page.</li>
                                        <li className="additions-list-item">Scope creep can be a problem with any project. I'm afraid that if I try and fulfill this TODO list, I'll have another one by the time I'm done.</li>
                                    </ul>
                                <li>Categories and Pie Chart</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">If I put in categories that you can tag expenses in, then I could add in a pie chart feature that shows how much each category consumes.</li>
                                        <li className="additions-list-item">If I implemented this and the graph links, I'd have to deactivate graph links for this. That or give each section the same function as the "Show List" button, and have it set the filter as well.</li>
                                    </ul>
                                <li>Browser Detection</li>
                                <ul className="additions-list__sub__sub">
                                    <li className="additions-list-item">Google OAuth doesn't work on iOS native browsers, (e.g. FB Messenger or Snapchat), so I have to detect and pop-up a message.</li>
                                    <li className="additions-list-item">I don't have an iPhone (the main culprit; Android works), which makes it hard to test.</li>
                                </ul>
                                <li>Forecaster</li>
                                    <ul className="additions-list__sub__sub">
                                        <li className="additions-list-item">This is an idea for an additional component. It takes the data that you've filtered and estimates your dollar value expenditures for the next {'{week | month | year}'}.</li>
                                        <li className="additions-list-item">I'd have to figure out exactly what supervised machine learning technique would be best. Maybe something like SVM?</li>
                                    </ul>
                            </ul>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdditionsPage;
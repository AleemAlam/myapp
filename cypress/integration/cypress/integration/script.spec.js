const data = [
  "https://devmanush-foreach.github.io/coding_evaluation/",
  "https://confident-allen-dff7d2.netlify.app/",
  "https://evaluationmasai.herokuapp.com/",
  "https://fw13-082-c4.netlify.app/",
  "https://musing-varahamihira-145aa2.netlify.app/",
  "https://cocky-feynman-a1678c.netlify.app/",
  "https://eval-redux.vercel.app/",
  "https://modest-bassi-c1ef4a.netlify.app/",
  "https://lucid-williams-92e9f5.netlify.app/",
  "https://wizardly-fermi-979db8.netlify.app/",
  "https://googlepiyush.netlify.app/",
  "https://loving-spence-403935.netlify.app/",
  "https://flamboyant-hoover-0f6a6e.netlify.app",
  "https://google-unit5.netlify.app/",
  "https://unit5c4googlesearch.netlify.app/",
  "https://c4eva.herokuapp.com/",
  "https://ashok-google.netlify.app/",
  "https://csb-7nqsq6.netlify.app/",
  "https://relaxed-mirzakhani-c881f3.netlify.app/",
  "https://react-evaluation-2.netlify.app/",
  "https://googlenitesh.netlify.app/",
  "http://vigorous-agnesi-69c92e.netlify.app",
  "https://super-cool-site-by-mujhusain.netlify.app/",
  "https://google-search29.herokuapp.com/",
  "https://goofy-leakey-e59cc9.netlify.app/",
  "https://trusting-hugle-5aad04.netlify.app",
  "https://reactc4evaluation.netlify.app/",
  "https://unit-5-c-2-tazammul-web13.netlify.app/",
  "https://vamsi-google.netlify.app/",
  "https://pavithran-c4-evaluation.netlify.app/",
  "http://admiring-williams-33ee9a.netlify.app",
  "https://unit5-evaluation.herokuapp.com/",
  "https://unit5-c2.vercel.app",
  "https://c4-eval-4zggkuxvb-codemitesh.vercel.app",
  "https://infallible-bartik-3871b4.netlify.app/",
  "https://adityaseacrhgoogle.netlify.app/",
  "https://assignmentc4.netlify.app/",
  "https://coding-contest-2.netlify.app",
  "https://csb-tthufh.netlify.app/",
  "https://flamboyant-euclid-b849d4.netlify.app/?",
  "https://coding-evalution.netlify.app/search",
  "https://search-ecru.vercel.app/",
  "https://santosh-konappanavar.github.io/google_search/",
  "https://googlereactredux.netlify.app/",
  "https://g-serch-clone-mithlesh.netlify.app/",
  "https://biswajit-google-serach.netlify.app",
  "https://react-eval.herokuapp.com/",
  "https://elegant-hypatia-ea064f.netlify.app/",
];
//   C2Testcase();

//   function generateScore(a, s) {
//     const attempt = cy.state("runnable")._currentRetry;

//     s = attempt === 1 ? -1 : 1; //at first attempt by default give 2 score, if failed, reset to 0 by negating 2

//     a += s; //accumulate scores

//     a = a < 0 ? 0 : a; //so that score doesnt get negative

//     return a;
//   }
console.log(data);
describe("example to-do app", () => {
  let accScore = 0;
  let score = 0;
  data.forEach(({ url }) => {
    beforeEach(() => {
      cy.visit(url);
    });
    it("Should have home page with one image and one search box", () => {
      cy.visit("/");
      cy.get("#homepage").children().should("have.length", 2);
      cy.get("#homepage").children().get("img").should("exist");
      cy.get("#homepage").children().get(".search-image").should("exist");
      cy.get("#homepage").children().get("input").should("exist");
      cy.get("#homepage").children().get(".search-box").should("exist");
      cy.get("#homepage").children().get(".search-box").type("search query");
    });

    it("should search the query on pressing enter and go to the search page", () => {
      cy.visit("/");
      const query = "sample sample";
      cy.get("#homepage").children().get(".search-box").type(query);
      cy.get("#homepage").children().get(".search-box").type("{Enter}");
      cy.url().should("include", "/search?q=sample%20sample");
      cy.request(`http://localhost:3001/data?q=${query}`)
        .its("body")
        .should("exist");

      cy.get("#navbar").children().get("img").should("exist");
      cy.get("#navbar").children().get("input").should("exist");
      cy.get("#navbar").children().get("input").should("have.value", query);
      cy.get("#navbar").children().get("button").should("exist");
    });

    it("Should search for query on pressing enter as well as on clicking the search button", () => {
      const query = "Yadel";
      cy.get("#navbar").children().get("input").clear();
      cy.get("#navbar").children().get("input").type(query);
      cy.get("#navbar").children().get("input").type("{Enter}");
      cy.url().should("include", "/search?q=Yadel");
      cy.request(`http://localhost:3001/data?q=${query}`)
        .its("body")
        .should("exist");

      cy.get("#navbar").children().get("input").clear();
      cy.get("#navbar").children().get("input").type(query);
      cy.get("#navbar").children().get(".search").click();
      cy.url().should("include", "/search?q=Yadel");
      cy.request(`http://localhost:3001/data?q=${query}`)
        .its("body")
        .should("exist");
    });

    it("should render the search results that is exact 1", () => {
      cy.visit("/search?q=Yadel");
      cy.get("#search-result").children().should("have.length", 1);
      cy.get("#search-result").children().get(".result").should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".title")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".creation-date")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".explicit")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".quality")
        .should("exist");
    });

    it("Should search for query that has exact 2 results", () => {
      cy.visit("/search?q=Link");
      cy.get("#search-result").children().should("have.length", 2);
      cy.get("#search-result").children().get(".result").should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".title")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".creation-date")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".explicit")
        .should("exist");
      cy.get("#search-result")
        .children()
        .get(".result")
        .children()
        .get(".quality")
        .should("exist");
    });

    it("Page should contain buttons for sorting and explicit filtering", () => {
      cy.visit("/search?q=Link");
      cy.get("button").should("have.length", 8);
      cy.get("button[id=sort-alphabetically]").should("exist");
      cy.get("button[id=sort-by-date]").should("exist");
      cy.get("button[id=sort-by-quality]").should("exist");
      cy.get("button[id=filter-explicit]").should("exist");
    });

    it("on clicking sort by alphabet button, it should sort alphabetically ASC", () => {
      cy.visit("/search?q=an");
      cy.get(".title").should("be.visible");
      cy.get("button[id=sort-alphabetically]")
        .click()
        .then(() => {
          cy.get(".title").then((x) => {
            console.log(x);
            const temp = [];
            for (const el of x) {
              temp.push(el.innerText);
            }
            let sorted = true;
            for (let x = 0; x < temp.length - 1; x++) {
              if (temp[x] > temp[x + 1]) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("on clicking sort by alphabet button, it should sort alphabetically desc order", () => {
      cy.visit("/search?q=an");
      cy.get(".title").should("be.visible");
      cy.get("button[id=sort-alphabetically-desc]")
        .click()
        .then(() => {
          cy.get(".title").then((x) => {
            // console.log(x);
            const temp = [];
            for (const el of x) {
              temp.push(el.innerText);
            }
            let sorted = true;
            console.log(temp);
            for (let x = 0; x < temp.length - 1; x++) {
              if (temp[x] < temp[x + 1]) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("On clicking sort by creation date it should sort in decreasing order", () => {
      cy.visit("/search?q=an");
      cy.get("button[id=sort-by-date]")
        .click()
        .then(() => {
          cy.get(".creation-date").then((x) => {
            const temp = [];
            for (const el of x) {
              temp.push(el.innerText);
            }
            let sorted = true;
            console.log(temp);
            for (let x = 0; x < temp.length - 1; x++) {
              if (new Date(temp[x]) > new Date(temp[x + 1])) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("On clicking sort by creation date it should sort in Ascending order", () => {
      cy.visit("/search?q=an");
      cy.get("button[id=sort-by-date-desc]")
        .click()
        .then(() => {
          cy.get(".creation-date").then((x) => {
            const temp = [];
            for (const el of x) {
              temp.push(el.innerText);
            }
            let sorted = true;
            console.log(temp);
            for (let x = 0; x < temp.length - 1; x++) {
              if (new Date(temp[x]) < new Date(temp[x + 1])) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("On clicking sort by quality, it should sort by quality in ASC order", () => {
      cy.visit("/search?q=an");
      cy.get("button[id=sort-by-quality]")
        .click()
        .then(() => {
          cy.get(".quality").then((x) => {
            const temp = [];
            for (const el of x) {
              temp.push(Number(el.innerText));
            }
            console.log(temp);
            let sorted = true;
            for (let x = 0; x < temp.length - 1; x++) {
              if (temp[x] > temp[x + 1]) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("On clicking sort by quality, it should sort by quality in desc order", () => {
      cy.visit("/search?q=an");
      cy.get("button[id=sort-by-quality-desc]")
        .click()
        .then(() => {
          cy.get(".quality").then((x) => {
            const temp = [];
            for (const el of x) {
              temp.push(Number(el.innerText));
            }
            console.log(temp);
            let sorted = true;
            for (let x = 0; x < temp.length - 1; x++) {
              if (temp[x] < temp[x + 1]) {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("on clicking filter explicit it should show only explicit true items", () => {
      cy.visit("/search?q=an");
      cy.get("button[id=filter-explicit]")
        .click()
        .then(() => {
          cy.get(".explicit").then((x) => {
            const temp = [];
            for (const el of x) {
              temp.push(el.innerText);
            }
            let sorted = true;
            for (let x = 0; x < temp.length; x++) {
              if (temp[x] === "Yes") {
                sorted = false;
              }
            }
            assert.isTrue(sorted);
          });
        });
    });

    it("Should open result detail page as route /page/id", () => {
      cy.visit("/search?q=Link");
      // cy.get("Link").should("exist"); ??
      cy.get(".title").then((x) => {
        x[0].click();
      });
      cy.url().should("include", "/page/1");
      cy.get("#detailed-result").should("exist");
      cy.get("#detailed-result").children().get(".title").should("exist");
      cy.get("#detailed-result")

        .children()
        .get(".creation-date")
        .should("exist");
      cy.get("#detailed-result > .title").should("have.text", "Linkbuzz");
      cy.get("#detailed-result > .author").should(
        "have.text",
        "Jenkins, Blanda and Ferry"
      );
      cy.get("#detailed-result > .creation-date").should(
        "have.text",
        "20/03/2021"
      );
      cy.get("#detailed-result > .explicit").should("have.text", "No");
      cy.get("#detailed-result > .quality").should("have.text", "53%");
    });
  });
});

// () => {
//     let acc_score = 0;
//     let score = 0;
//     urls.forEach(url => {
//         // test cases

//           it("Should render hello world", () => {

//             // cy.get("#addgame").children().should("have.length", 8);
//             // cy.get("#addgame").children().get("[name='gamename']").should("exist");
//             // cy.get("#addgame").children().get("[name='gameauthor']").should("exist");
//             // cy.get("#addgame").children().get("[name='gameprice']").should("exist");
//             // cy.get("#addgame").children().get("[name='gamedesc']").should("exist");
//             // cy.get("textarea[name='gamedesc']").should("exist");

//             acc_score = generateScore(acc_score, score);

//           });
//     })
// ​}

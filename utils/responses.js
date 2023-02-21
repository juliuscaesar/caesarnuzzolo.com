export function responses(cmd, user) {
  let commandResponses = {
    hello: `Hi, ${user}!`,
    bio: "Check back later.",
    email:
      '<a href="mailto:caesarnuzzolo@gmail.com">caesarnuzzolo@gmail.com</a>',
    linkedin:
      '<a target="_blank" href="https://www.linkedin.com/in/caesar-nuzzolo-81b0a3231/">https://www.linkedin.com/in/caesar-nuzzolo-81b0a3231</a>',
    github:
      '<a target="_blank" href="https://github.com/juliuscaesar">github.com/juliuscaesar</a>',
    help: "<span>Enter one of the following commands:<br />✨ hello<br />✨ bio<br />✨ email<br />✨ linkedin<br />✨ github<br />✨ clear<br />✨ help<br />✨ logout</span>",
  };
  return commandResponses[cmd];
}

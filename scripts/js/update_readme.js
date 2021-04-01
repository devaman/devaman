const fetch = require("node-fetch");
const fs = require("fs")
const query = `
    {
      user(username: "amitchambial") {
        publication {
          posts{
            slug
            title
            brief
            coverImage
          }
        }
      }
    }
  `;

const fetchPosts = async() => {
    const result = await fetch('https://api.hashnode.com', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    const ApiResponse = await result.json();
    console.log(ApiResponse.data.user.publication.posts);
    const posts = ApiResponse.data.user.publication.posts.slice(0, 3).map(d => {
        return `
### [${d.title}](https://blog.devaman.dev/${d.slug})
<img src="${d.coverImage}" height="100" />
<p>${d.brief}</p>
`
    });

    const markdown = `
![Hello everyone 👋](https://img.devaman.dev/2/?title=Hello%20Everyone%20%F0%9F%91%8B&website=github.com/devaman&back=f1d15b&textFill=fefefe&height=200)
I am Amit Chambial , A Full stack developer. 

I love to contribute to open-source software on GitHub. I am working for JP Morgan Chase as a Software Engineer I. 

I have also worked as a Freelancer and I am a five star freelancer. 

My moto is Make to Learn thats why i have made lots of projects as you can see. I love to make side projects. See my [Producthunt](https://www.producthunt.com/@amitchambial) and [Gumroad](https://gumroad.com/amit_chambial) seller page

# My Blogs

${posts.join("\n----\n")}

For More blogs visit my [blog](https://blog.devaman.dev) 
`;

    fs.writeFileSync('./README.md', markdown)



};
fetchPosts()

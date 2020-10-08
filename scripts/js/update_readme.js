const axios = require("axios");
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

const fetchPosts = async () => {
    return await axios({
        url: 'https://api.hashnode.com',
        method: 'post',
        data: {
            query: `
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
            `
        }
    })


};
fetchPosts().then(result => {
    const posts = result.data.data.user.publication.posts.map(d => {
        return `
### [${d.title}](https://blog.devaman.dev/${d.slug})
<img src="${d.coverImage}" height="100" />
<p>${d.brief}</p>
`
    });

    const markdown = `
![Hello everyone 👋](https://img.devaman.dev/2/?title=Hello%20Everyone%20%F0%9F%91%8B&website=github.com/devaman&back=022022&textFill=fefefe&height=200)
I am Amit Chambial , A Full stack developer. 

I love to contribute to open-source software on GitHub. I am working for JP Morgan Chase as a Software Engineer I. 

I have also worked as a Freelancer and I am a five star freelancer. 

My moto is Make to Learn thats why i have made lots of projects as you can see. I love to make side projects. See my [Producthunt](https://www.producthunt.com/@amitchambial) and [Gumroad](https://gumroad.com/amit_chambial) seller page

# My Blogs

${posts.join("\n----\n")}
`;

    fs.writeFileSync('./README.md', markdown)

}).catch(err=>{
    console.log(err);
});
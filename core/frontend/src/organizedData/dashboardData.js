import Userposts from "../components/UserPosts";
import Userfollowedtags from "../components/userFollowedTags";
import Followers from "../components/Followers";

export default [
    {
        id: 1,
        title: 'Posts',
        compo: Userposts
    },
    {
        id: 2,
        title: 'Followers',
        compo: Followers
    },
    {
        id: 3,
        title: 'Following tags',
        compo: Userfollowedtags
    }

]
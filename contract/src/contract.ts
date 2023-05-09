import { NearBindgen, near, call, view, UnorderedMap, Vector } from 'near-sdk-js';
// accountId:
// new dev-1667723773628-84611716458448

// how to call the function add_posts in terminal
// near call dev-1667723773628-84611716458448 add_post '{"title": "Unreal 5 Unity Game Development","description":"Build 99 games and even more projects.", "tags":"game development,coding,online course","media":"https://static.wixstatic.com/media/e4a583_ce1dd5eaf6e64affab912dc3c8a43962~mv2.png/v1/fill/w_224,h_86,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/reco%20website%20august%20-%20header-04.png"}' --accountId dev-1667723773628-84611716458448
// near call dev-1667723773628-84611716458448 add_post '{"title": "Build a Battle Royale","description":"Learn to code and 3D model for games.", "tags":"game development, games","media":"https://static.wixstatic.com/media/e4a583_ce1dd5eaf6e64affab912dc3c8a43962~mv2.png/v1/fill/w_224,h_86,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/reco%20website%20august%20-%20header-04.png"}' --accountId dev-1667723773628-84611716458448

// get_all_posts
// near view dev-1667723773628-84611716458448 get_all_posts

// like_a_post
// near call dev-1667723773628-84611716458448 like_a_post '{"postId":0}' --accountId dev-1667723773628-84611716458448

// get_my_liked_posts
// near call dev-1667723773628-84611716458448 get_my_liked_posts --accountId dev-1667723773628-84611716458448

// get_posts_by_tag
// near view dev-1667723773628-84611716458448 get_posts_by_tag '{"tag": "game development"}'
class Post{
  id: string;
  title: string;
  description: string;
  tags: Vector;
  media: string;
  users_who_liked: string[];
  owner_id: string;
  

  constructor(id: string, title: string, description: string, tags: Vector, media: string){
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.media = media;
    this.users_who_liked = [];
    this.owner_id = near.predecessorAccountId();
  }
}

@NearBindgen({})
class SocialMedia {

  posts: UnorderedMap;
  number_of_posts: number;
  likes_by_users_id: UnorderedMap;
  posts_by_tags: UnorderedMap;

  constructor() {
    this.posts = new UnorderedMap("p");
    this.number_of_posts = 0;
    this.likes_by_users_id = new UnorderedMap('l');
    this.posts_by_tags = new UnorderedMap('t');
  }

  add_posts_by_tag(post: Post, tags: string[]){
    for(var i =0 ; i <tags.length ; i++){
      var tag = tags[i];
      var posts_for_tag;
      if(this.posts_by_tags.get(tag) == null){
        posts_for_tag = [];
      }else{
        posts_for_tag = this.posts_by_tags.get(tag);
      }
      posts_for_tag.push(post);
      this.posts_by_tags.set(tag,posts_for_tag);
    }
  }

  @call({})
  add_post({title, description, tags, media}): Post{
    var id = this.number_of_posts.toString();
    tags = tags.split(",");
    var post = new Post(id, title, description,tags, media);
    this.posts.set(id,post);
    // this.posts_by_tags.set();
    this.number_of_posts++;

    //add post to posts_by_tags
    this.add_posts_by_tag(post,tags);

    return post;
  }

  @view({})
  get_all_posts({}){
    return this.posts.toArray();
  }

  add_post_to_my_liked(sender_id, post){
    var likes;
    if(this.likes_by_users_id.get(sender_id) !=null ){
      likes = this.likes_by_users_id.get(sender_id);
    }
    else{
      likes = [];
    }
    likes.push(post);
    this.likes_by_users_id.set(sender_id,likes);
  }

  @call({})
  like_a_post({postId}): Post{
    postId = postId.toString();

    if(this.posts.get(postId) == null){
      return null;
    }

    var post = this.posts.get(postId) as Post;
    var sender_id = near.predecessorAccountId();
    post.users_who_liked.push(sender_id);
    this.posts.set(postId, post);

    this.add_post_to_my_liked(sender_id, post);

    return post;
  }


  @call({})
  get_my_liked_posts({}) : Post[]{
    var my_liked_posts;
    var sender_id = near.predecessorAccountId();

    if(this.likes_by_users_id.get(sender_id) !=null ){
      my_liked_posts = this.likes_by_users_id.get(sender_id);
    }
    else{
      return [];
    }
    

    return my_liked_posts;
  }

  @view({})
  get_posts_by_tag({tag}){
    if(this.posts_by_tags.get(tag)==null){
      return [];
    }
    return this.posts_by_tags.get(tag);
  }

}
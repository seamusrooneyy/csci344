import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # return the first 20 posts in the users feed, if the user specifies a limit, honor that limit, unless its above 50, then retrun an error
        try:
            count = int(request.args.get("limit", 20))
            if count > 50:
                    return Response(json.dumps({"message":"requesting too many posts!"}), mimetype="application/json", status=400)
        except:
            return Response(json.dumps({"message":"limit must be an integer!"}), mimetype="application/json", status=400)
            
        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(count)

        # TODO: add the ability to handle the "limit" query parameter:

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # TODO: handle POST logic
        # capture data that the user sent us. If it is not the data we are expecting, throw an error. 
        data = request.json
        image_url = data.get('image_url')
        caption = data.get('caption')
        alt_text = data.get('alt_text')
        print(data)

        if image_url is None:
            return Response(json.dumps({"message":"no image url!"}), mimetype="application/json", status=400)
        if not image_url.lower().startswith(('http://', 'https://')):
            return Response(json.dumps({"message":"invalid image url!"}), mimetype="application/json", status=400)
        new_post = Post(
            image_url= image_url,
            caption= caption,
            alt_text= alt_text,
            user_id= self.current_user.id
        )
        # new_post.image_url = image_url
        # new_post.caption = caption
        # new_post.alt_text = alt_text
        db.session.add(new_post)
        db.session.commit()
        db.session.refresh(new_post)

        return Response(json.dumps(new_post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        data = request.json
        print(data)
        caption = data.get("caption")
        image_url = data.get("image_url")
        alt_text = data.get("alt_text")

        post = Post.query.get(id)
        if post is None:
            return Response(
            json.dumps({"Message" : f"Post Id={id} not found"}), mimetype="application/json", status=404
            )
        
        if post.user_id != self.current_user.id:
            return Response(json.dumps({"Message" : f"You can't modify Post Id={id}"}), mimetype="application/json", status=404)
    
        if caption is not None:
            post.caption = caption
        if image_url is not None:
            post.image_url = image_url
        if alt_text is not None:
            post.alt_text = alt_text

        db.session.commit()
        # TODO: Add PATCH logic...
        return Response(
            json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=200
            )

    def delete(self, id):
        print("POST id=", id)
        post = Post.query.get(id)

        if post is None:
            return Response(json.dumps({"Message" : f"Post Id={id} not found"}), mimetype="application/json", status=404)
        
        if post.user_id != self.current_user.id:
            return Response(json.dumps({"Message" : f"You can't modify Post Id={id}"}), mimetype="application/json", status=404)
    

        Post.query.filter_by(id=id).delete()
        db.session.commit()
        # TODO: Add DELETE logic...
        return Response(
            json.dumps({"Message" : f"Post Id={id} has been deleted"}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)
        # TODO: Add GET logic...
        can_view = can_view_post(id, self.current_user)
        if can_view:
            # query and return post
            post = Post.query.get(id)
            return Response(
                json.dumps(post.to_dict(user=self.current_user)),
                mimetype="application/json",
                status=200,
            )
        else:
            # return 
            return Response(
            json.dumps({"Message": f"Post id = {id} not found"}),
            mimetype="application/json",
            status=404,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )

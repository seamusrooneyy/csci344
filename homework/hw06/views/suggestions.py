import json

from flask import Response
from flask_restful import Resource

from models.user import User
from views import get_authorized_user_ids
import flask_jwt_extended

class SuggestionsListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def get(self):
        user_ids = get_authorized_user_ids(self.current_user)
        users = User.query.filter(~User.id.in_(user_ids)).limit(7).all()
        return Response(
            json.dumps([user.to_dict() for user in users]),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        SuggestionsListEndpoint,
        "/api/suggestions",
        "/api/suggestions/",
        resource_class_kwargs={"current_user": current_user},
    )

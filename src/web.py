
from flask import Flask, request, Response
import json
from flask_cors import CORS


web = Flask(__name__)
CORS(web)

def jsonfy(content):
	return json.dumps(content, ensure_ascii=False)

def getParam(name):
	return request.args.get(name)


@web.route('/first', methods=['GET'])
def first():
	return "hello world"


@web.route('/article/get', methods=['GET'])
def getArticle():
	print(request.values.__dict__)
	id = request.values["id"]
	if id.isdigit():
		fileName = "./"+str(id)+".txt"
		file = open(fileName, 'r', encoding="utf-8")
		content = file.read()
		title="文章"+str(id)
		resJson = jsonfy({'title':title, 'content':content})
		return resJson
	return "fail"


	# method = request.method

	# res = make_response(jsonify(token=123456, gender=0, method = method))  # 设置响应体
	# res.status = '200'  # 设置状态码
	# res.headers['Access-Control-Allow-Origin'] = "*"  # 设置允许跨域
	# res.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE,OPTIONS'
	# return res


@web.route('/article/newArticle', methods=['POST'])
def newArticle():
	print(request.json)
	print(request.headers)
	content = request.json["content"]
	token = request.headers["Access-Token"]
	if not token == 'qjiwrjznvkzgmnsjgpwjepotjwoptwetj':
		return "fail"
	id = str(request.json['id'])
	if id.isdigit():
		fileName = "./"+str(id)+".txt"
		file = open(fileName, 'w', encoding="utf-8")
		print(content, file=file)
		return "suc"
	return "fail"

# forsakensoul*42$5%
@web.route('/article/login', methods=['POST'])
def login():
	print(request.json)
	print(request.headers)
	name = request.json["username"]
	password = request.json["password"]
	if name == 'ggadmin' and password=='41b79a4f1e1d579d6de996bf1a3c59cc':
		return jsonfy({'code':123, 'result':{'userid':1, 'token':"qjiwrjznvkzgmnsjgpwjepotjwoptwetj"}})
	return "fail"

if __name__ == "__main__":
	web.run(host='0.0.0.0', port=5590)


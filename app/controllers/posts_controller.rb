class PostsController < ApplicationController

  def index # indexアクションを定義
    # postモデルの情報をすべて取得。orderでidを新しい順で並び替える。
    @posts = Post.all.order(id: "DESC")
  end
  
  def new

  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end

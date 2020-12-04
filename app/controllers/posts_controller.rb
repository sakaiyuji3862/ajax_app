class PostsController < ApplicationController

  def index # indexアクションを定義
    # postモデルの情報をすべて取得。orderでidを新しい順で並び替える。
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
  
  #『既読』の操作を行ったときに実行されるアクション
  def checked
    # ルーティングで設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得している。
    post = Post.find(params[:id]) 
    # post.checkedという既読であるか否かを判定するプロパティを指定
    if post.checked
      # 既読であれば『既読を解除するためにfalseへ変更』
      post.update(checked: false)
    else
      # 既読でなければ『既読にするためtrueへ変更』
      post.update(checked: true)
    end
     # 更新したレコードをitem = Post.find(params[:id])で取得し直し、
    item = Post.find(params[:id])
    # JSON形式（データ）としてchecked.jsに返却
    render json: { post: item }
  end
end
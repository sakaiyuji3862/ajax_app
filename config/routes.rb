Rails.application.routes.draw do
  root to: "posts#index"
  post 'posts', to: 'posts#create'
  # メモのidを取得できるようにルーティングに設定。pathパラメーター。
  get 'posts/:id', to: 'posts#checked'
end

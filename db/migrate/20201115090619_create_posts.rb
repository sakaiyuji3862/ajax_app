class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.boolean :checked # boolean型。trueまたはfalseの真理値を判断する型です。既読機能実装時に「既読か未読か」をboolean型で管理。
      t.timestamps
    end
  end
end

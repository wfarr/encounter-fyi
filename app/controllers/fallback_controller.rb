class FallbackController < ApplicationController
  include ActionView::Rendering

  def index_html
    render file: 'public/index.html'
  end
end

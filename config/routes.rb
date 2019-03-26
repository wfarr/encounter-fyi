Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games
    end
  end

  # route any path we don't recognize to react-router?
  root to: "application#fallback_index_html"

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

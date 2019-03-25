Rails.application.routes.draw do
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  namespace :api do
    namespace :v1 do
      resources :games
    end
  end

  # route any path we don't recognize to react-router?
  root "application#fallback_index_html"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

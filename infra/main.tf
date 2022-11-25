terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~>2.23.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "node" {
  name         = "node"
  keep_locally = true
  build {
    path = "."
    tag  = ["todo:dev"]
  }
}

resource "docker_image" "postgres" {
  name         = "postgres"
  keep_locally = true
}

resource "docker_container" "todo_pg" {
  image   = docker_image.postgres.image_id
  name    = "todo_pg"
  env     = ["POSTGRES_HOST=postgres", "POSTGRES_PORT=5432", "POSTGRES_USER=postgres", "POSTGRES_PASSWORD=12345678", "POSTGRES_DB=to_do", "POSTGRES_HOST_AUTH_METHOD=password"]
  restart = "always"
  host {
    host = "postgres"
    ip   = "127.0.0.1"
  }
  ports {
    internal = 5432
    external = 5433
  }
}

resource "docker_container" "todo_api" {
  image = "todo:dev"
  name  = "todo_api"
  host {
    host = "todo"
    ip   = "127.0.0.1"
  }
  ports {
    internal = 3000
    external = 3030
  }
}

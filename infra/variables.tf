variable "HOME" {
  type        = string
  description = "change to yours home directory if needed"
}

variable "public_key_file" {
  default     = ".ssh/todo.pub"
  description = "your public key"
}

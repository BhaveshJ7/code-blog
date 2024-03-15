import * as React from "react"
import { Link } from "gatsby"
import {
  Badge,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { slugify } from "../util/utilityFunctions"

const Post = ({ title, author, slug, date, body, image, tags }) => {
  const img = getImage(image)

  return (
    <Card>
      <Link to={slug}>
        <GatsbyImage image={img} alt={title} className="card-image-top" />
      </Link>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>
          <span className="text-info">{date}</span> by{" "}
          <span className="text-info">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        <ul className="post-tags">
          {tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge color="primary" className="text-uppercase">
                  {tag}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={slug} className="btn btn-outline-primary float-right">
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post

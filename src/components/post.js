import React from "react"
import { Link } from "gatsby"
import {
  Badge,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"

const Post = ({ title, author, slug, date, body, fluid, tags }) => (
  <Card>
    <Img className="card-image-top" fluid={fluid} />
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{" "}
        <span className="text-info">{author}</span>
      </CardSubtitle>
      <CardText>{body}</CardText>
      <ul className="post-tags">
        {tags.map(tag => (
          <li>
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

export default Post

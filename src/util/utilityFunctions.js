const slugify = function (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/[&?]+/g, "") // Remove colons, ampersands, and question marks
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
    .replace(/:/g, "_") // Replace colons with underscores
}

module.exports = { slugify }

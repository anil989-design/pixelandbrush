import { useEffect } from "react";
import { SITE_URL } from "../config/seo";

/** Find-or-create a <meta>/<link> tag in <head> and set one attribute on it. */
function upsert(tag, keyAttr, keyValue, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

/**
 * Per-route <head> metadata for the SPA: title, description, canonical, Open Graph and Twitter.
 * Google renders JavaScript, so the canonical is set here per route (not hard-coded in
 * index.html, where it would wrongly point every route at the home page).
 */
export default function usePageMeta({ title, description, path = "/" }) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = title;
    upsert("meta", "name", "description", "content", description);
    upsert("link", "rel", "canonical", "href", url);
    upsert("meta", "property", "og:title", "content", title);
    upsert("meta", "property", "og:description", "content", description);
    upsert("meta", "property", "og:url", "content", url);
    upsert("meta", "name", "twitter:title", "content", title);
    upsert("meta", "name", "twitter:description", "content", description);
  }, [title, description, path]);
}

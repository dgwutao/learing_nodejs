import requse from "@/utils/request.js";


export function addMessage(message) {
  return requse({
    url: "/api/jwp/index/add-message",
    method: "get",
    params: {
      name:message.name,
      phone:message.phone,
      email:message.email,
      message:message.message
    },
  });
}

export function getProjectDetail(id) {
  return requse({
    url: "/api/jwp/index/project-detail",
    method: "get",
    params: {
      id:id
    },
  });
}

export function getProjectList(is_homepage,pageIndex,pageSize) {
  return requse({
    url: "/api/jwp/index/project-list",
    method: "get",
    params: {
      is_homepage:is_homepage,
      pageIndex:pageIndex,
      pageSize:pageSize
    },
  });
}

export function getCountryDetail(id) {
  return requse({
    url: "/api/jwp/index/country-detail",
    method: "get",
    params: {
      id:id
    },
  });
}

export function getCountry() {
  return requse({
    url: "/api/jwp/index/country",
    method: "get",
    params: {},
  });
}

export function getAdList(id) {
  return requse({
    url: "/api/jwp/index/ad-list",
    method: "get",
    params: {
      position_id:id
    },
  });
}

export function getAdOne(id) {
  return requse({
    url: "/api/jwp/index/ad-one",
    method: "get",
    params: {
        position_id:id
    },
  });
}

export function getDict() {
  return requse({
    url: "/api/jwp/index/dict",
    method: "get",
    params: {},
  });
}

// export function getAdList(id) {
//   return requse({
//     url: "/api/dds/ad/ad-list",
//     method: "get",
//     params: { position_id: id },
//   });
// }

export function getAd(id) {
  return requse({
    url: "/api/dds/ad/ad-one",
    method: "get",
    params: { position_id: id },
  });
}
export function getNewList(data) {
  return requse({
    url: "/api/dds/news/list",
    method: "get",
    params: data,
  });
}

export function getNewDetail(id) {
  return requse({
    url: "/api/dds/news/info",
    method: "get",
    params: { id: id },
  });
}

export function getRelation(id) {
  return requse({
    url: "/api/dds/news/relation",
    method: "get",
    params: { id: id },
  });
}

import db from "./client.js";
import { createCategory } from "./queries/categories.js";
import { createEvent } from "./queries/events.js";
import { createUser } from "./queries/users.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser(
    "Kiana",
    "Mills",
    "kiana",
    "password123",
    "admin",
  );

  const categories = [
    "Hiking",
    "Running",
    "Paddleboarding",
    "Soccer",
    "Pickleball",
    "Tennis",
    "Camping",
    "Volleyball",
    "Golfing",
    "Skateboarding",
    "Walking",
    "Kite Flying",
  ];

  for (const name of categories) {
    await createCategory(name);
  }

  const events = [
    {
      title: "Sunrise Hike at Red Rocks",
      description: "Beginner-friendly morning hike with scenic views.",
      creator_id: 1,
      category_id: 1,
      location: "Red Rocks Park",
      image_url:
        "https://www.google.com/imgres?q=red%20rocks%20sunrise&imgurl=https%3A%2F%2Fewscripps.brightspotcdn.com%2Fdims4%2Fdefault%2F7c80784%2F2147483647%2Fstrip%2Ftrue%2Fcrop%2F640x360%2B0%2B20%2Fresize%2F1200x675!%2Fquality%2F90%2F%3Furl%3Dhttp%253A%252F%252Fmedia.thedenverchannel.com%252Fphoto%252F2016%252F03%252F02%252Fred-rocks-sunrise_1456938245393_32952953_ver1.0_640_480.jpg&imgrefurl=https%3A%2F%2Fwww.denver7.com%2Fnews%2Ffront-range%2F7-tips-for-attending-red-rocks-easter-sunrise-service&docid=ETjBAVSFQRbEqM&tbnid=jJwpyxelq-UYFM&vet=12ahUKEwjp_bbkyIyUAxXMHzQIHRi5K-UQnPAOegQIYhAB..i&w=1200&h=675&hcb=2&ved=2ahUKEwjp_bbkyIyUAxXMHzQIHRi5K-UQnPAOegQIYhAB",
      event_date: "2026-05-03 08:00:00",
    },
    {
      title: "Wash Park Pickup Volleyball",
      description: "Open sand volleyball games for all skill levels.",
      creator_id: 1,
      category_id: 8,
      location: "Washington Park",
      image_url:
        "https://www.google.com/imgres?q=wash%20park%20volleyball&imgurl=https%3A%2F%2Fimages.clubexpress.com%2F506413%2Fgraphics%2FVolleyball_815989477.jpg&imgrefurl=https%3A%2F%2Fwww.upthecreek.org%2Fcontent.aspx%3Fpage_id%3D4002%26club_id%3D506413%26item_id%3D1424742&docid=RA3jVsHvkwb0sM&tbnid=9jFkqGbPpExRGM&vet=12ahUKEwiXlYm4yYyUAxXtHjQIHVQKKv8QnPAOegQIFhAB..i&w=1600&h=900&hcb=2&ved=2ahUKEwiXlYm4yYyUAxXtHjQIHVQKKv8QnPAOegQIFhAB",
      event_date: "2026-05-25 11:00:00",
    },
    {
      title: "Sloan's Lake Group Run",
      description: "3-mile social run around the lake.",
      creator_id: 1,
      category_id: 2,
      location: "Sloan's Lake",
      image_url:
        "https://www.google.com/imgres?q=sloans%20lake%20&imgurl=https%3A%2F%2Fmedia-production.lp-cdn.com%2Fcdn-cgi%2Fimage%2Fformat%3Dauto%2Cquality%3D85%2Cfit%3Dscale-down%2Cwidth%3D1280%2Fhttps%3A%2F%2Fmedia-production.lp-cdn.com%2Fmedia%2Fzi9mcf9mi3b24psoakrn&imgrefurl=https%3A%2F%2Frgkcolorado.com%2Fblog%2Fsloans-lake-denver-neighborhood-guide&docid=kQTUmsGrvyw6GM&tbnid=-EU9uC8wj1pklM&vet=12ahUKEwjli_TdyYyUAxUbMTQIHWT5G08QnPAOegQILBAB..i&w=1280&h=854&hcb=2&ved=2ahUKEwjli_TdyYyUAxUbMTQIHWT5G08QnPAOegQILBAB",
      event_date: "2026-05-23 13:00:00",
    },
    {
      title: "Beginner Pickleball Night",
      description: "Fun beginner matches and meet new people.",
      creator_id: 1,
      category_id: 5,
      location: "Central Park Courts",
      image_url:
        "https://www.westword.com/wp-content/uploads/sites/2/ww-media/mediaserver/den/2025-13/gates.webp",
      event_date: "2026-05-12 15:00:00",
    },
    {
      title: "City Park Tennis Rally",
      description: "Casual doubles and singles rotation.",
      creator_id: 1,
      category_id: 6,
      location: "City Park",
      image_url:
        "https://tennispronow.com/courts/wp-content/uploads/2024/04/hujivocqqdwqqccuwyft.png",
      event_date: "2026-05-25 11:00:00",
    },
    {
      title: "Weekend Camping Meetup",
      description: "Group camping trip and campfire social.",
      creator_id: 1,
      category_id: 7,
      location: "Golden Gate Canyon",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHnV22_Fzbn-FAUK3SUz43mPgFSiFApLktg&s",
      event_date: "2026-05-14 09:00:00",
    },
    {
      title: "Cherry Creek Paddleboarding",
      description: "Relaxed paddleboarding session on the water.",
      creator_id: 1,
      category_id: 3,
      location: "Cherry Creek Reservoir",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cUobbLFuFmeq8wQ_-zAXEvmA1-r6FBBpgg&s",
      event_date: "2026-05-16 13:00:00",
    },
    {
      title: "Sunday Soccer Scrimmage",
      description: "Friendly co-ed soccer game.",
      creator_id: 1,
      category_id: 4,
      location: "Ruby Hill Park",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjrTRQijdyt5bmzx0nmPi4dz6l821Vut8Dw&s",
      event_date: "2026-05-22 11:00:00",
    },
    {
      title: "Longboard Cruise Downtown",
      description: "Easy city cruise for riders of all levels.",
      creator_id: 1,
      category_id: 10,
      location: "RiNo District",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQi8wBCIRLO1uxIvA5y3Ppr0totYvear9oSA&s",
      event_date: "2026-05-29 12:00:00",
    },
    {
      title: "Neighborhood Dog Walk",
      description: "Bring your dog and meet other locals.",
      creator_id: 1,
      category_id: 11,
      location: "Cheesman Park",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHgPu9pnF5aNenFZy9IO6GgXvlw6v0EJLQw&s",
      event_date: "2026-05-09 11:00:00",
    },
  ];

  for (const event of events) {
    await createEvent(
      event.title,
      event.description,
      user.id,
      event.category_id,
      event.location,
      event.image_url,
      event.event_date,
    );
  }
}

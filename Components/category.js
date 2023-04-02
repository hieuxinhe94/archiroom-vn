import Link from "next/link"; 

export default function CategoryLabel({ categories }) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href="#" key={index}>
            <a>
              <span color={category.color}>{category.title}</span>
            </a>
          </Link>
        ))}

      <Link href="#" >
        <a>
        &nbsp;
        </a>
      </Link>
    </div>
  );
}

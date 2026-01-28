import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={80}
        height={80}
        className="rounded-sm md:mb-5"
      />
      <h1 className="text-lg text-black font-bold text-center">
        Welcome to <br /> Starter Boilerplate Nextjs Cloudflare
      </h1>
    </div>
  );
}

export default function StatCard({
title,
value,
color
}){

return(

<div className="bg-white rounded-2xl p-6 shadow-sm">

<p className="text-gray-500">
{title}
</p>

<h1 className={`text-4xl font-bold ${color}`}>
{value}
</h1>

</div>

)

}